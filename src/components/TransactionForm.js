import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/transactionActions'
import { bindActionCreators } from 'redux'

class TransactionForm extends Component {
    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
        if(this.props.currentIndex==-1)
            return {
                bAccountNo : '',
                iFSC : '',
                bName : '',
                amount : ''
            }
        else
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentIndex != this.props.currentIndex || prevProps.list.length != this.props.list.length)
        this.setState({...this.returnStateObject()})
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        if(this.props.currentIndex == -1){
            this.props.insertTransaction(this.state)
        }
        else
            this.props.updateTransaction(this.state)
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit} autoComplete="off">
                <input name="bAccountNo" placeholder='A/C No.' value = {this.state.bAccountNo} onChange={this.handleInputChange} /> <br/>
                <input name="iFSC" placeholder='iFSC Code' value = {this.state.iFSC} onChange={this.handleInputChange} /> <br/>
                <input name="bName" placeholder='A/C Holder Name.' value = {this.state.bName} onChange={this.handleInputChange} /> <br/>
                <input name="amount" placeholder='Amount' value = {this.state.amount} onChange={this.handleInputChange} /> <br/>
                <button type='submit'>Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction: actions.insert,
        updateTransaction: actions.update
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (TransactionForm)
