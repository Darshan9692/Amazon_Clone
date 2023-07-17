import React from 'react'
import Carousel from 'react-material-ui-carousel';
import car1 from '../home/car1.jpg'
import car2 from '../home/car2.jpg'
import car3 from '../home/car3.jpg'
import '../home/banner.css'

const data = [
    
    car1 ,  car2 , car3 
    
]

function Banner() {
    return (
        <Carousel className='carasousel'
        autoPlay={true}
        animation='slide'
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
            style:{
                backgroundColor:'white',
                color:'black',
                borderRadius:0,
                marginTop:-22,
                height:'104px'
            }
        }}
        >
            {
                data.map((imag, i) => {
                    return (
                        <>
                            <img src={imag} alt="fefef" className='banner_img'/>
                        </>
                    )
                })
            }
        </Carousel>
    )
}

export default Banner
