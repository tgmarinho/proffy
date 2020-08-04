import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem: React.FC = () => {

  return (
    <article className="teacher-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/380327?s=460&u=61b426b901b8fe02e12019b1fdb67bf0072d4f00&v=4" alt="Thiago Marinho"/>
             <div>
               <strong>Thiago Marinho</strong>
               <span>Matemática</span>
            </div>
            </header>

            <p>
            Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar.
            <br />
            Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: "Aprenda a fazer dinheiro com isso!"
            </p>

          <footer>
            <p>
              Preço/hora
              <strong>R$ 80,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="Whatsapp"/>
              Entrar em contato
            </button>
          </footer>

          </article>
  )
}

export default TeacherItem;
