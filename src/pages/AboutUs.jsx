import React from 'react'
import logoPeque from "../images/logoPeque.png"
import dj from "../images/dj-sombra.webp"
import "../css/aboutUs.css"
import { Link } from 'react-router-dom'
function AboutUs() {
  return (
    <div className='aboutUsContainer'>
      <div className='logo-texto-about'>
        <div className='logo-texto-img'>
        <img src={logoPeque} alt="logo +QDance" />
        </div>
        <div className='logo-texto-texto'>
           <h2>NO Es Solo Música</h2>
            <p>
              Lorem ipsum dolor sit amet. Et odit quidem in consequatur quisquam sit 
              quia sint ea odit accusantium et quia deserunt. Ex quod eveniet aut soluta 
              ratione aut ullam Quis non voluptatum cumque ut sequi similique. Non volupts
              reiciendis aut sint dolorem et magnam minus eos officiis quam.

              Vel dolor voluptatem aut molestiae eveniet eos laboriosam repellat a voluptatibus 
              doloremque. Et architecto placeat sed mollitia porro ut inventore magni qui ullam
              dolores ut laudantium rerum.

              Aut iste quos aut necessitatibus culpa non officia fuga est dolorem iste? Et fugiat 
              iure eum facere doloremque non quia recusandae qui aperiam minus est harum consectetur! Non
              velit pariatur At obcaecati nisi vel laudantium libero qui aspernatur minima est voluptates 
              nostrum et exercitationem vitae qui velit dolores. Qui omnis consequatur aut architecto accusamus 
              sed voluptatem galisum qui iste accusantium!
            </p>
        </div>
      </div>
      <div className='text-bellow'>
        {/* <p>
             Lorem ipsum dolor sit amet. Et odit quidem in consequatur quisquam sit 
              quia sint ea odit accusantium et quia deserunt. Ex quod eveniet aut soluta 
              ratione aut ullam Quis non voluptatum cumque ut sequi similique. Non volupts
              reiciendis aut sint dolorem et magnam minus eos officiis quam.

              Vel dolor voluptatem aut molestiae eveniet eos laboriosam repellat a voluptatibus 
              doloremque. Et architecto placeat sed mollitia porro ut inventore magni qui ullam
              dolores ut laudantium rerum.

              Aut iste quos aut necessitatibus culpa non officia fuga est dolorem iste? Et fugiat 
              iure eum facere doloremque non quia recusandae qui aperiam minus est harum consectetur! Non
              velit pariatur At obcaecati nisi vel laudantium libero qui aspernatur minima est voluptates 
              nostrum et exercitationem vitae qui velit dolores. Qui omnis consequatur aut architecto accusamus 
              sed voluptatem galisum qui iste accusantium!
        </p> */}
      </div>
      <Link to="/djs">
        <div className='dj-container'>
          <div className='dj-image'>
            <img src={dj} alt="" />
          </div>
          <div className='dj-texto'>
            <p>Haz clik y descubre más nuestros Dj`S</p>
            <h4>No son Inteligencia Artificial!!</h4>
        </div>

        </div>
      </Link>
    </div>
  )
}

export default AboutUs