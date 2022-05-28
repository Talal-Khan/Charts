import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container} from 'react-bootstrap'
import './Dashboard.css';
import Text from './Text'
import Chart from './Chart'
import Doughnut from './Doughnut'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Table from './Table';
import Pie from './Pie'

const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            dropdownOptions: [],
            trendStore: [],
            selectedValue: null,
            organicSourceViews: null,
            directSourceViews: null,
            referralSource: null,
            socailSource: null,
            emailSource: null,
            pageViews:null,
            users:null,
            newUsers:null,
            sessions:null,
            noOfSessions:null,
            pagePerSessions:null,
            avgSessionTime:null,
            bounceRate:null,
            userArr:[],
            sessionArr:[],
            pageArr:[]
        };
    }

    getData = arg => {

        const arr = this.state.items;
        const arrLen = arr.length;
        let organicSourceViews = 0;
        let directSourceViews = 0;
        let referralSource = 0;
        let socailSource = 0;
        let emailSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let sessions = 0;
        let noOfSessions = 0;
        let pagePerSessions = 0;
        let avgSessionTime = 0;
        let bounceRate = 0;
        let selectedValue = null;
        let trendStore = [];
        let userArr=[];
        let sessionArr=[];
        let pageArr=[];
  
        for (let i = 0; i < arrLen; i++) {
            if (arg === arr[i]["month"]) {
console.log(arr[i]);
                organicSourceViews = arr[i].organic_source;
                directSourceViews = arr[i].direct_source;
                referralSource = arr[i].referral_source;
                socailSource = arr[i].social_source;
                emailSource = arr[i].email_source;
                pageViews = arr[i].page_views;
                users = arr[i].users;
                newUsers = arr[i].new_users;
                sessions = arr[i].sessions;
                noOfSessions = arr[i].number_of_sessions_per_users;
                pagePerSessions = arr[i].page_per_session;
                avgSessionTime = arr[i].avg_session_time;
                bounceRate = arr[i].bounce_rate;

                trendStore.push({
                    label: "Oraganic",
                    value: arr[i].organic_source,
                }, {
                    label: "Referral",
                    value: arr[i].referral_source,
                },{
                    label: "Direct",
                    value: arr[i].direct_source,
                },{
                    label: "Social",
                    value: arr[i].social_source,
                },{
                    label: "Email",
                    value: arr[i].email_source,
                });

                userArr.push({
                    label:"Users",
                    value: arr[i].users,
                },{
                    label:"New Users",
                    value: arr[i].new_users,
                });
                sessionArr.push({
                    label:"Number of Sessions per User",
                    value:arr[i].number_of_sessions_per_users,
                },{
                    label:"Average Sessions Time",
                    value:arr[i].avg_session_time,
                },{
                    label:"Bounce Rate",
                    value:arr[i].bounce_rate,
                });

                pageArr.push({
                    label:"Page Views",
                    value:arr[i].page_views,
                },{
                    label:"Sessions",
                    value:arr[i].sessions,
                },{
                    label:"Page Per Sessions",
                    value:arr[i].page_per_session,
                });
            }
        }
        selectedValue = arg;

        this.setState({
            organicSourceViews: organicSourceViews,
            directSourceViews: directSourceViews,
            referralSource: referralSource,
            socailSource: socailSource,
            emailSource: emailSource,
            pageViews: pageViews,
            users: users,
            newUsers: newUsers,
            sessions: sessions,
            noOfSessions: noOfSessions,
            pagePerSessions: pagePerSessions,
            avgSessionTime: avgSessionTime,
            bounceRate: bounceRate,
            trendStore: trendStore,
            userArr: userArr,
            sessionArr:sessionArr,
            pageArr: pageArr
        });
    };

    updateDashboard = event => {
        this.getData(event.value);
        this.setState({ selectedValue: event.value });
    };

    componentDidMount() {
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }

                // dropdown options
                let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );

            });
    }
    render() {
 

        return (
            <div>
            
            <Container fluid>
                <Row className="TopHeader">
                    <Col>
                        <img className="image" src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" width="100px" height="50px"/>
                        DASHBOARD
                    </Col>
                    <Col>
                        <Dropdown className="" options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} />
                    </Col>
                </Row>
            </Container>

            <Container className="wrapContainer" >
            <Row>
                <Col>
                    <Row>
                    <Col>
                        <Text title="Organic Source" value={this.state.organicSourceViews}/>
                    </Col>

                    <Col>
                        <Text title="Direct Source" value={this.state.directSourceViews}/>
                    </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Text title="Referral Source" value={this.state.referralSource} />
                        </Col>
                        <Col>
                            <Text title="Email Source" value={this.state.emailSource} />     
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text title="Social Source" value={this.state.socailSource} />
                        </Col>
                        <Col></Col>
                    </Row>
                </Col>
                <Col>
                    <Chart title="Sources" data={this.state.trendStore} />
                </Col>
            </Row>
            </Container>
            <Container>
            <Row>
                <Col>
                    <Doughnut title="Page & sessions" data={this.state.pageArr} />
                </Col>
                
                <Col>
                    <Row>
                        <Col>
                            <Text title="Page Views" value={this.state.pageViews} />
                        </Col>
                        <Col>
                            <Text title="Sessions" value={this.state.sessions} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text title="Page Per Session" value={this.state.pagePerSessions} />
                        </Col>
                        <Col></Col>
                    </Row>
                </Col> 
            </Row>
            </Container>

            <Container>
            <Row>
                <Col>
                    <Text title="Users" value={this.state.users} />
                </Col>
                <Col>
                    <Text title="New Users" value={this.state.newUsers}/>
                </Col>
            </Row>
            
            <Row>
                <Col>
            <Chart title="Users" data={this.state.userArr} />
            </Col>
            </Row>
            </Container>

            <Container>
            <Row>
                <Col>
                <Row>
                    <Col>
                        <Text title="Number Of Sessions Per Users" value={this.state.noOfSessions}/>
                    </Col>
                    
                    <Col>
                        <Text title="Average Session Time" value={this.state.avgSessionTime}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text title="Bounce Rate" value={this.state.bounceRate} />
                    </Col>
                    <Col></Col>
                </Row>
                </Col>

                <Col>
                <Pie title="Sessions Description" data={this.state.sessionArr} />
                </Col>
            </Row>
            </Container>
            

 
            
            </div>
        )
    }
}

export default Dashboard;
