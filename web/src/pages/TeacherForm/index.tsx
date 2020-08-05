import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'
import { useHistory } from 'react-router'
import Textarea from '../../components/Textarea'
import Input from '../../components/Input'

import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import Select from '../../components/Select'
import api from '../../services/api'

function TeacherForm() {

    const history = useHistory()

    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [bio, setBio] = useState("")

    const [subject, setSubject] = useState("")
    const [cost, setCost] = useState(0)

    const [scheduleItems, setScheduleItems] = useState([{week_day: 0, from: '', to: ''}])


    function addNewScheduleItem() {
      setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
    }

    async function handleCreateClass(e: FormEvent) {
      e.preventDefault()

      await api.post('classes', {
        name, avatar, whatsapp, subject, bio, cost, schedule: scheduleItems
      })
      .then(() => {
        alert('Cadastro realizado com sucesso')
      })
      .catch(() => {
        alert('Falha no cadastro!')
      })

      history.push('/')

    }

    function setScheduleItemValue(position: number, field: string, value: string) {
      const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if(index === position) {
          return {
            ...scheduleItem, [field]: value
          };
        }
        return scheduleItem
      });

      setScheduleItems(updateScheduleItems)

    }


    return (

      <div id="page-teacher-form" className="container">
         <PageHeader
          title="Que incrível que você quer dar aulas."
          description="O primeiro passo é preencher esse formulário de inscrição"
        />

        <main>
          <form onSubmit={handleCreateClass}>
            <fieldset>
              <legend>Seus dados</legend>
              <Input
                  name="name"
                  label="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
              <Input
                  name="avatar"
                  label="Avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)} />
              <Input
                name="whatsapp"
                label="WhatsApp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)} />
              <Textarea
                name="bio"
                label="Biografia"
                value={bio}
                onChange={(e) => setBio(e.target.value)}/>
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>
              <Select
                name="subject"
                label="Matéria"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ed. Física', label: 'Ed. Física' },
                  { value: 'História', label: 'História' },
                  { value: 'Português', label: 'Português' },
                  { value: 'Química', label: 'Química' },
                  { value: 'Geografia', label: 'Geografia' },
                  { value: 'Física', label: 'Física' }
              ]} />

              <Input
                name="cost"
                label="Custo da hora por aula"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}/>
            </fieldset>

            <fieldset>
              <legend>Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}> + Novo horário</button>
              </legend>

            {
              scheduleItems.map((scheduleItem, index) => (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                  ]} />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />
              </div>
              ))
            }


            </fieldset>


            <footer>
              <p>
                <img src={warningIcon} alt="Aviso importante"/>
                Importante! <br />
                Preencha todos os dados
              </p>
              <button type="submit">Salvar Cadastro</button>
            </footer>
            </form>
        </main>

      </div>

    )
}

export default TeacherForm
