import React, { Component } from 'react';
import axios from 'axios';
import './infinity-scroll.css';

class InfinityScroll extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            offset: this.props.offset || 0, // starting point : 0 by default
            limit: this.props.limit || 10,  // number of data per loading
            thread: [],                     // data loaded
            loadingData: false,              // the loading flag
            allDataLoaded: false
        }

        this.scrollFunction = this.viewDidScroll.bind(this); //bind the scroll listener function
    }
    
    componentWillMount() {
        //clean and initialize the scroll listener
        window.removeEventListener('scroll', this.scrollFunction);
        window.addEventListener('scroll', this.scrollFunction);
        
        //load the first data
        this.loadData();
    }

    /**
     * load the data with offset and limit param and update the state
     */
    loadData() {   
        //load data with get method (she use axios but you can use your own method if you want)
        this.get(this.state.offset, this.state.limit).then(data => {
            
            this.setState({ 
                thread: this.state.thread.concat(data), //add the data to the thread
                offset: this.state.offset + this.state.limit, //update the offset point
                loadingData: false //warn that the loading is finished
            })
            
            if(data.length < this.state.limit){ //if we have loaded all the data
                //stop the scroll listener (it just for cleaning, but you can keep it if needed)
                window.removeEventListener('scroll', this.scrollFunction); 
                //warn that all data was loaded
                this.setState({ allDataLoaded: true });
            }
        })
    }

    /**
     *  load the data with axios (you can use your own method if you want)
     */
    get(offset, limit) {
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:3000/data/data.json'; //or use your url (with offset and limit params)
            
            axios.get(url).then(response => { //you can replace axios with your favorite lib :)

                setTimeout(() => { //the setTimeout is for simulate the back time response (you can delete it)
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

    /**
     * method use by the scroll listener
     */
    viewDidScroll() {

        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50) 
            && !this.state.loadingData) {
            this.setState({ loadingData: true },
                this.loadData()
            )
        }
    }

    render() {
        //you can customize the template (and the css infinity-scroll.css)
        return (
            <div className="infinity-scroll-container">
                    <div className="infinity-scroll-list">
                        {
                            this.state.thread.map((person, index) => (
                                <div key={index} className="infinity-scroll-item">
                
                                    <h4 className="infinity-scroll-title">{index+1}. {person.name}</h4>
                                    <div className="infinity-scroll-info">
                                        <strong>Email:</strong> {person.email}
                                    </div>
                                    
                                    <div className="infinity-scroll-info">
                                        <strong>Phone:</strong>{ person.phone} 
                                    </div>
                                    <label className="infinity-scroll-info">
                                        <strong>Address: </strong>
                                        <div dangerouslySetInnerHTML={{ __html: person.address }} />
                                    </label>
                                </div>
                            ))
                        }
                        <br/>
                        { this.state.loadingData ? <div className="infinity-scroll-loader"></div> : null }
                        { this.state.allDataLoaded ? <div className="infinity-scroll-all-loaded">-- END --</div> : null }
                    </div>
            </div>
        );
    }
}

export default InfinityScroll;