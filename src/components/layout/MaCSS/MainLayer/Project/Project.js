// Defaults import
import React, { useRef, forwardRef } from 'react';
import './Project.css';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';

const Project = forwardRef((props, ref) => {
    
    return (
        <div ref={ref} className='project'>
            <div className='background'>

            </div>
            <div className='content'>
                <h5 style={{ paddingBottom: `3vw` }}>
                    Other Project
                </h5>
                <div className='project-card-container'>
                    <ProjectCard dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
                        <h5>Canyons</h5>
                        <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                    </ProjectCard>
                    <ProjectCard dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
                        <h5>Canyons</h5>
                        <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                    </ProjectCard>
                    <ProjectCard dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
                        <h5>Canyons</h5>
                        <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                    </ProjectCard>
                    <ProjectCard dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
                        <h5>Canyons</h5>
                        <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                    </ProjectCard>
                </div>
            </div>
        </div>
    );
});

export default Project;
