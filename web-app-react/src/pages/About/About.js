import React from 'react';
import './About.css';
import jacob from './jacob.jpg';
import michael from './michael.jpg';
import moises from './moises.png';
import jakob from './jakob.png';
import sandy from './sandy.png';
import saeed from './saeed.jpg';
import stefan from './stefan.jpg';
import john from './john.jpg';
import roger from './roger.jpg'
import linkedin from './linkedin.png';
import sdei from './sdei.png'

function About() {
  return (
    <div className="main">
      <div className="aboutContainer">
        <p className='aboutInfo'>
          Our team has worked hard to develop and initialize this web application and simulation tool. Meet the team: 
        </p>
        <div className='teamSDSU'>
            <div className='team-member'>
                <div className='content'>
                    <div className='left'>
                        <img src={michael} alt='michael' width="175" height="175" />
                    </div>
                    <div className='info'>
                        <p className='name'>Michael Eng</p>
                        <p className='title'>Electrical Engineer</p>
                        <a className='title' href='https://www.linkedin.com/in/michael-eng1/'> 
                            <img src={linkedin} alt='linkedin' width="25" height="25" /> 
                        </a>
                        <p className='bio'> Michael is an Electrical Engineer. He has gained years of internship experience in the aerospace
                         and defense industry working for Northrop Grumman. After graduation, he will transition full-time for Northrop Grumman 
                         and plans on continuing his education with the pursuit of a Master's 
                         Degree in Electrical Engineering.
                         </p>
                    </div>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
                <div className='content'>
                    <div className='info'>
                        <p className='name'>Moises Hernandez Castillo</p>
                        <p className='title'>Electrical Engineer</p>
                        <a className='title' href='https://www.linkedin.com/in/moises-hernandez-castillo-8b18b5218/'> 
                            <img src={linkedin} alt='linkedin' width="25" height="25" /> 
                        </a>
                        <p className='bio'> Moises is a future Electrical Engineer. Moises started developing his interest
                        in electrical engineering in 2006 working for a state-owned power company serving most of central Mexico,
                        including Mexico City, most of the State of Mexico, and some communities in the states of Morelos, Hidalgo,
                        and Puebla. In 2009, the current President of Mexico decreed dissolving Luz y Fuerza del Centro
                        (LFC, also rendered on the logo as "LyF"). The dissolution of the company encouraged Moises to pursue a career 
                        in the same field. He is currently working to achieve his goal of getting his degree in December 2023
                         at San Diego State University.
                        </p>
                    </div>
                    <div className='left'>
                        <img src={moises} alt='moises' width="175" height="175" />
                    </div>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
                <div className='content'>
                    <div className='left'>
                        <img src={jacob} alt='jacob' width="175" height="175" />
                    </div>
                    <div className='info'>
                        <p className='name'>Jacob Hosburg</p>
                        <p className='title'>Computer Engineer</p>
                        <a className='title' href='https://www.linkedin.com/in/jacob-hosburg-496447265/'> 
                            <img src={linkedin} alt='linkedin' width="25" height="25" /> 
                        </a>
                        <p className='bio'> Jacob is a dedicated Computer Engineer who is pursuing his degree from San Diego
                        State University. His passion for technology and a strong foundation in programming, he is proficeint in 
                        a variety of programming languages, incuding C/C++, Java, JavaScript, Python and React. His education has
                        provided him with a deep understanding of data structures and software development. He is committed to delivering
                         high-quality solutions to complex problems. 
                         <div className='spacer'></div>
                         In addition to his technical abilities, he brings a range of valuable skills to the table. He believes in hard
                         work and persistence, which has fueled his academic successes. His ability to swiftly adapt to changing environments
                         and absorb new material has proven invaluable in the fast-paced tech industry.
                          </p>
                    </div>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
            <div className='content'>
                <div className='info'>
                    <p className='name'>Jakob Tiger</p>
                    <p className='title'>Computer Engineer</p>
                    <a className='title' href='https://www.linkedin.com/in/jakobtiger/'> 
                            <img src={linkedin} alt='linkedin' width="25" height="25" /> 
                    </a>
                    <p className='bio'> Jakob is a computer engineer. (fill this in with a biography or 
                        something but it needs to atleast be long enough to push the image)</p>
                </div>
                <div className='left'>
                    <img src={jakob} alt='jakob' width="175" height="175" />
                </div>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
                <div className='content'>
                    <div className='left'>
                        <img src={sandy} alt='sandy' width="175" height="175" />
                    </div>
                    <div className='info'>
                        <p className='name'>Sandro Solaqa</p>
                        <p className='title'>Computer Engineer</p>
                        <a className='title' href='https://www.linkedin.com/in/sandrosolaqa/'> 
                            <img src={linkedin} alt='linkedin' width="25" height="25" /> 
                        </a>
                        <p className='bio'> Sandy is a Computer Engineer. He has a strong grasp of programming languages
                         like C, C++, Matlab, HTML, CSS, JavaScript, Python. His expertise extends to utilizing tools like 
                         Git, Github, Jira, Docker, React, MongoDB, Django, Raspberry Pi, and
                         FPGA, enabling him to create innovative solutions and explore the
                         world of software and hardware. Eager to learn and grow, he is constantly seeking new challenges
                         to expand his knowledge and skills in the ever-evolving field of technology. </p>
                    </div>
                </div>
            </div>
            <div className='gold-line'></div>
        </div>
        <div className='advisor'>
            <p className='aboutInfo'>
                Dr. Manshadi is our Senior Design Advisor 
            </p>
            <div className='content'>
                <div className='info'>
                    <p className='name'>Dr. Saeed Manshadi</p>
                    <p className='title'>Assistant Professor</p>
                    <p className='bio'> Prior to joining the Department of Electrical and Computer Engineering at San Diego State 
                    University as an assistant professor, Dr. Manshadi was a postdoctoral fellow at the Department of Electrical 
                    and Computer Engineering at the University of California, Riverside. He received a Ph.D. degree from Southern 
                    Methodist University, Dallas, TX; an M.S. degree from the University at Buffalo, the State University of New 
                    York (SUNY), Buffalo, NY, and a B.S. degree from the University of Tehran, Tehran, Iran all in electrical 
                    engineering.
                    <div className='spacer'></div>
                    Dr. Manshadi is the SDSU co-director for Southern California Energy Innovation Network. He was 
                    the recipient of the Frederick E. Terman Award from Bobby Lyle School of Engineering. He serves as an editor 
                    for IEEE Transactions on Vehicular Technology and as a reviewer for several IEEE Transactions journals including 
                    Smart Grid, Sustainable Energy, Power Systems, Intelligent Transportation, and Industrial Informatics. His 
                    current research interests include transportation electrification, smart grid, microgrids, integrating renewable 
                    and distributed resources, and power system operation and planning.</p>
                </div>
                <div className='left'>
                    <img src={saeed} alt='saeed' width="175" height="175" />
                </div>
                
            </div>
        </div>
        <div className='gold-line'></div>
        <div className='sponsor'>
            <p className='aboutInfo'>
                Our simulation tool is based off the M Module prepared and built by SDEI, here are our sponsors: 
            </p>
            <a className='title' href='https://www.seadragon.energy/'> 
                            <img src={sdei} alt='sdei' width="200" height="50" /> 
            </a>
            <div className='content'>
                <div className='left'>
                    <img src={john} alt='john' width="175" height="175" />
                </div>
                <div className='info'>
                    <p className='name'>John Kohut</p>
                    <p className='title'>Chairman & CEO</p>
                    <p className='bio'> John is a forward-thinking leader and serial entrepreneur. With several successful start-up 
                    enterprises in his back-pocket – such as Global Air Logistics and Training, Orison, Planetary Power and Astrobotic 
                    Technology to mention a few – he is guiding Sea Dragon Energy's vision to become the next trail-blazer in the 
                    alternative energy space. 
                    <div className='spacer'></div>
                    Sea Dragon Energy is leveraging off John’s broad and in-depth technological knowledge in renewable 
                    energy and his vast network in the defense space. A former F-14 Tomcat Naval Flight Officer – a 
                    high-flying career spanning over 27 years – he is locked on target.</p>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='content'>
                <div className='info'>
                    <p className='name'>Stefan Sillen</p>
                    <p className='title'>President & COO</p>
                    <p className='bio'> Stefan is a business strategist and a renewable energy executive. Being highly organized 
                    and stubborn, he brings direction and momentum to Sea Dragon Energy and having worked for over 20 years in the 
                    energy business, he contributes valuable industrial expertise to the team. 
                    <div className='spacer'></div>
                    He is driven by curiosity and inspired to bring new and innovative solutions to big issues facing the world. 
                    Stefan spent over a decade developing renewable energy across the world before joining the Sea Dragon Energy team.
                     With a background in financing, he is ready to pull out the breaks and roll out the spreadsheets.</p>
                </div>
                <div className='left'>
                    <img src={stefan} alt='stefan' width="175" height="175" />
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='content'>
                <div className='left'>
                    <img src={roger} alt='roger' width="175" height="175" />
                </div>
                <div className='info'>
                    <p className='name'>Roger Lenard</p>
                    <p className='title'>CTO</p>
                    <p className='bio'> With 12 patents under his belt, Roger is a genuine innovator with profound technical 
                    expertise in nuclear engineering and innovative energy solutions. He brings over 35 years of experience in 
                    high technology research and development to Sea Dragon Energy – always a step ahead. 
                    <div className='spacer'></div>
                    Apart from being a valued member of Sea Dragon Energy's management team, Roger is also the chairman of the 
                    International Academy of Astronautics Commission III. Among several past roles, he previously served as the 
                    program manager within the Strategic Defense Initiative Organization. As a former F-106 test pilot, Roger is 
                    always ‘game on’ for a new challenge.</p>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default About;
