import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import './css/Schedule.css'

export default class Schedule extends Component {
    dateClick=(info)=>{
        // alert(info.dateStr); 
        this.setState({ clickedDate: info.dateStr }); 
    }

    render() {
        return(
            <>
            <div className='schedule'
                style={{ margin:15, display:'grid',gridTemplateColumns:"2fr 1fr"}}>
                <FullCalendar   
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                    initialView={'dayGridMonth'}
                    headerToolbar={
                        {
                            start: 'today', 
                            center: 'title',
                            end: 'prev,next' 
                        }
                    }
                    dateClick={this.dateClick}
                />
                
                 <div 
                  className='result'>
                    <h2>경기 결과</h2>
                      {this.state && this.state.clickedDate && ( // 상태에 저장된 클릭한 날짜가 있으면 오른쪽에 보여줌
                        <div className='detail'>날짜: {this.state.clickedDate}</div>
                      )}
                  </div>
            </div>
            </>     
        );
    }
}
