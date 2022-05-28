import React, { Component } from 'react'

export default class Text extends Component {
    render() {
        return (
            <div className="widgetWrap">
                    <div className="widgetTitle">{this.props.title}
                    </div>
                    <div className="widgwtValue">
                       <h4 className="value">{this.props.value}</h4>
                        <h4 className="description">{this.props.description}</h4>
                    </div>  
                </div> 
        )
    }
}
