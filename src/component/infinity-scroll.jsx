import React, { Component } from 'react';
import axios from 'axios';
import './infinity-scroll.css';

class InfinityScroll extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            offset: this.props.offset || 0,
            limit: this.props.limit || 10,
            thread: [],
            loadingData: false
        }

        this.scrollFunction = this.viewDidScroll.bind(this);
    }
    
    componentWillMount() {
        //clean initialize the scroll listener
        window.removeEventListener('scroll', this.scrollFunction);
        window.addEventListener('scroll', this.scrollFunction);
        
        //load the first datas
        this.loadData();
    }

    loadData() {   
        //you can use your own method instead
        this.get(this.state.offset, this.state.limit).then(data => {
            
            this.setState({ 
                thread: this.state.thread.concat(data),
                offset: this.state.offset + this.state.limit,
                loadingData: false
            })
            
            if(data.length < this.state.limit){ //if we have loaded all the datas
                window.removeEventListener('scroll', this.scrollFunction); //stop the scroll listener
            }
        })
    }

    // you can use your own method instead
    get(offset, limit) {
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:3000/data/data.json';
            axios.get(url)
            .then(response => {
                setTimeout(() => { //the setTimeout is for simulate the back time response
                    //the response.data.slice is for simulate the offest and limit of an API
                    resolve(response.data.slice(offset, offset+limit))
                }, 500)
            })
            .catch(error => {
                console.log('CATCH Infinity-Scroll:', url, '\nError:', error)
                reject(error)
            })
        })
    }

    viewDidScroll() {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50) && !this.state.loadingData) {
            this.setState({ loadingData: true },
                this.loadData()
            )
        }
    }

    render() {
        //customize your template (and the css infinity-scroll.css)
        return (
            <div className="infinity-scroll-container">
                    <ul className="infinity-scroll-list">
                        {
                            this.state.thread.map((person, index) => (
                                    <li key={index} className="infinity-scroll-item">
                    
                                        <h4>{person.name}</h4>
                                        <div dangerouslySetInnerHTML={{ __html: person.age }} />
                             
                                    </li>
                                )
                            )
                        }
                        <br/>
                        { this.state.loadingData ? <div className="infinity-scroll-loader"></div> : null }
                    </ul>
            </div>
        );
    }
}

export default InfinityScroll;