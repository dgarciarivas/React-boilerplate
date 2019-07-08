import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';


class PendienteInput extends React.Component{

             constructor(){
                    super();
                      console.log('initializing pendiente list');
                      this.state={
                        Pendiente: '',
                        pendientetxt: undefined,
                     } 
                     
                    
                    this.onChangePen = this.onChangePen.bind(this);
                    this.removeItemPen = this.removeItemPen.bind(this);
                    this.onSubmitPen = this.onSubmitPen.bind(this);
                    this.handleOnSubmitPen = this.handleOnSubmitPen.bind(this);
                  
                  }             
                onChangePen = (event) =>{
                    this.setState({pendientetxt: event.target.value});
                }
                removeItemPen = (index)=> { 
                    var list = window.localStorage.getItem(`${this.props.name}`).split(',');
                      if(list===null || list.length===1){ 
                        window.localStorage.removeItem(`${this.props.name}`);    
                        }
                     else{
                        console.log('List before removal', list);
                        var peace = list.splice(index, 1); 
                        window.localStorage.setItem(`${this.props.name}`, `${list}`);
                        console.log('removeItemPen ending local storage', window.localStorage);
                    }
                  location.reload(false);
                }

               onSubmitPen = (event)=>{
                event.preventDefault();
                console.log(this, 'this    at the begining of onSubmitPen')
                if(this.state.pendientetxt == undefined || this.state.pendientetxt === ' ' || this.state.pendientetxt === '' ){
                    alert("Please enter a value");
                }
                else{
                    var copy = window.localStorage.getItem(`${this.props.name}`);
                    var addition = copy+','+this.state.pendientetxt;
                    window.localStorage.setItem(`${this.props.name}`, addition);
                         this.setState({
                        pendientetxt: '',
                    });
                }
                console.log(this, 'this at the end of onSubmitPen');

                }
              handleOnSubmitPen(list, copy){
              console.log('handleNewPendiente() start');
              if(copy.length > list.length) {
                    console.log('A pendiente was added named:');
                    //create a new list with initial values
                    var addition = copy[(copy.length -1)];
                    console.log(addition);
                    console.log('copy', copy)
                    window.localStorage.setItem(`${this.props.name}`, copy);  //it looks like saving a list name is working, need to be able to save the list
              }
              console.log('handleNewPende() end');
                 }   
                render(){
                      return(
                        <div>
                           
                            <form onSubmit={this.onSubmitPen}>
                                <input                                    
                                    value={this.state.pendientetxt} 
                                    placeholder={`Pendiente de ${this.props.name}`}
                                    onChange={this.onChangePen}
                        
                                />
                            </form>
                            {/*Object.values(JSON.parse(window.localStorage.getItem('App')).easy).map((d, i) => (<List removeItemPen={this.removeItemPen} name={d} index={i} key={'ah-'+ i} />))}
                            {Object.values(JSON.parse(window.localStorage.getItem('App')).medium).map((d, i) => (<List removeItemPen={this.removeItemPen} name={d} index={i} key={'ah-'+ i} />))}
                            {Object.values(JSON.parse(window.localStorage.getItem('App')).hard).map((d, i) => (<List removeItemPen={this.removeItemPen} name={d} index={i} key={'ah-'+ i} />))}
                            {/*window.localStorage.getItem(`${this.props.name}`).split(',').map((d, i) => (<List removeItemPen={this.removeItemPen} name={d} index={i} key={'ah-'+ i} />))*/}
                         </div>
                            );
                    }
  
    }
    export default PendienteInput;



