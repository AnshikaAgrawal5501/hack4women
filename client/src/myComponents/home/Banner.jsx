import React from 'react';
import './Banner.css';
import useWindowDimensions from './windowDimensions';
// import TypeWriterEffect from './TypeWriterEffect';

const Banner=()=>{

    const { height, width } = useWindowDimensions();
    const colors = ["FF5DA2", "F5C6A5", "FF00E4", "FDD2BF", "FF87CA", "ED50F1"];

    const animation=()=> {
    
        const section = document.getElementById('banner');
        const square = document.createElement("i");
    
        square.classList.add("fas");
        square.classList.add("fa-star");
    
        const size = Math.random() * 100;
    
        square.style.height = 50 + size + "px";
        square.style.width = 50 + size + "px";
    
        square.style.top = Math.random() * height + "px";
        square.style.left = Math.random() * width + "px";
        const randomColor = colors[Math.floor(Math.random() * 6)];
        square.style.color = "#" + randomColor;
    
        try{
            section.appendChild(square);
        }catch(e){
            // console.log(e);
        }
        
    
        setTimeout(function() {
            try{
                section.removeChild(square);
            }catch(e){
                // console.log(e);
            }
        }, 5000);
    }
    
    setInterval(animation, 25);

    return (
        <div style={{position:'relative'}}>
            {/* <TypeWriterEffect /> */}

            <div className='Typewriter'>
                Femaissance
                <br />
                Redefining motherhood!
            </div>

            <div className='quote'>
                <p>
                    Celebrating the warmth of this miraculous event of giving birth and making the ease of this experience 
                    everlasting,to a community of mothers who deserve more and beyond.
                </p>
            </div>

            <section id='banner'></section>
        </div>
    );
};

export default Banner;