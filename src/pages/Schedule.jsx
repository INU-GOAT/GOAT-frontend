import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import './css/Schedule.css';

export default class Schedule extends Component {
    state = {
        clickedDate: null,
        gameResults: [],
    };

    componentDidMount() {
        this.fetchGameResults();
    }

    fetchGameResults = async () => {
        try {
            const response = await fetch('http://15.165.113.9:8080/api/game/finished');
            const data = await response.json();
            if (Array.isArray(data)) {
                this.setState({ gameResults: data });
            } else {
                console.error("Fetched data is not an array:", data);
                this.setState({ gameResults: [] });
            }
        } catch (error) {
            console.error("Error fetching game results:", error);
            this.setState({ gameResults: [] });
        }
    };

    dateClick = (info) => {
        this.setState({ clickedDate: info.dateStr });
    };

    renderGameResults = () => {
        const { clickedDate, gameResults } = this.state;
        if (!clickedDate) return null;

        const filteredResults = gameResults.filter(result =>
            result.startTime.startsWith(clickedDate)
        );

        if (filteredResults.length === 0) {
            return (
                <div className='detail'>
                    <h3>날짜: {this.state.clickedDate}</h3>
                    <h3>경기 종류:</h3>
                    <h3>경기장: </h3>
                    <h3>경기 결과: </h3>
                    <h3>경기 시간: </h3>
                </div>
            );
        }

        return filteredResults.map(result => (
            <div key={result.gameId} className='detail'>
                <div>날짜: {this.state.clickedDate}</div>
                <div>경기 종류: {result.sportName}</div>
                <div>경기장: {result.court}</div>
                <div>경기 결과: {result.result}</div>
                <div>경기 시간: {new Date(result.startTime).toLocaleTimeString()}</div>
            </div>
        ));
    };

    render() {
        return (
            <>
                <div className='schedule'
                    style={{ margin: 15, display: 'grid', gridTemplateColumns: "2fr 1fr" }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={'dayGridMonth'}
                        headerToolbar={{
                            start: 'today',
                            center: 'title',
                            end: 'prev,next'
                        }}
                        dateClick={this.dateClick}
                    />

                    <div className='result'>
                        <h2>경기 결과</h2>
                        {this.renderGameResults()}
                    </div>
                </div>
            </>
        );
    }
}
