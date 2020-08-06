import {Request, Response } from 'express'
import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from '../database/connection';

interface ScheduleItem {
  week_day: number;
  from: string,
  to: string
}

export default class ClassesController {

  async create(request: Request, response: Response) {
    const {name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
  
    const trx = await db.transaction()
  
    try {
      
    const insertedUsersIds = await trx('users').insert({
      name, avatar, whatsapp, bio
    });
  
    const user_id = insertedUsersIds[0]
  
    const insertedClassesIds =  await trx('classes').insert({
      subject,
      cost,
      user_id
    });
  
    const class_id = insertedClassesIds[0];
  
    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to)
      } 
    })
  
    await trx('class_schedule').insert(classSchedule)
  
  
    await trx.commit()
  
  
    return response.status(201).send();
    } catch (error) {
  
      await trx.rollback();
  
      return response.status(400).json({
        error: 'Unexpected error white creating new class'
      })
    }
  
  
  }


    async index(request: Request, response: Response) {
      const filters = request.query;

      const subject = filters.subject as string;
      const week_day = filters.week_day as string;
      const time = filters.time as string;



      if(!filters.week_day || !filters.subject || !filters.time) {
        return response.status(400).json({
          error: 'Missing filters to search classes'
        })
      } 

      const timeInMinutes = convertHourToMinutes(time)
      
     const test = await db.raw(`select * from classes inner join users on classes.user_id = users.id where exists (select class_schedule from class_schedule where class_schedule.class_id = classes.id and class_schedule.week_day = 1 and class_schedule.from <= 540 and class_schedule.to > 540) and classes.subject = ?`, [subject])
      console.log(test)

      // select `classes`.*, `users`.* from `classes` inner join `users` on `classes`.`user_id` = `users`.`id` where exists (select `class_schedule`.* from `class_schedule` where `class_schedule`.`class_id` = `classes`.`id` and `class_schedule`.`week_day` = 1 and `class_schedule`.`from` <= 540 and `class_schedule`.`to` > 540) and `classes`.`subject` = ?'

      const classes = await db('classes')
          .whereExists(function () {
            this.select('class_schedule.*')
              .from('class_schedule')
              .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
              .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
              .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
              .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
          })
          .where('classes.subject', '=', subject)
          .join('users', 'classes.user_id', '=', 'users.id')
          .select(['classes.*', 'users.*'])


      return response.json(classes)


    }

}