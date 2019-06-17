import React from 'react';
import ReactDOM from 'react-dom';
import LosPendientes from './components/LosPendientes.jsx';

const rootEl = document.getElementById('root');


    class App extends React.Component{
        constructor(){
             super();
             if(window.localStorage.storage === undefined){
             
                console.log('initializing');
                window.localStorage.setItem('storage', 'start');
                this.state={
                  Titulo: undefined,
                  titulotxt: undefined,
                  Lista: [],
                  Pendientes: [],
                 };
            }else if(window.localStorage.storage === 'start'){
                var first = prompt('Empieza la lista!');
                let items = {'start': first}
                window.localStorage.setItem('storage', JSON.stringify(items));


            }else {
            	 
                console.log('populating list names');
                var storage = JSON.parse(window.localStorage.getItem('storage'));
                console.log('finished populating');
                this.state={
                    Titulo: undefined,
                    titulotxt: undefined,
                    Lista: Object.keys(storage)
                }
              }
              this.onChange = this.onChange.bind(this);
              this.onSubmit = this.onSubmit.bind(this);
              this.removeItem = this.removeItem.bind(this);
              this.handleOnSubmit = this.handleOnSubmit.bind(this);
              
          }
         onChange = (event) =>{
                this.setState({titulotxt: event.target.value});
            }
          onSubmit = (event)=>{
                event.preventDefault();
                var ListCopy = this.state.Lista;
                if(this.state.Titulo == undefined && (this.state.titulotxt == undefined || this.state.titulotxt == '')){
                    alert("Please enter a value");
                }  
                else {
                    this.setState({
                        titulotxt: '',
                        Lista: [...this.state.Lista, this.state.titulotxt]
                    });  
                     const ListCopy = [...this.state.Lista, this.state.titulotxt];
                    console.log('copy of lists after enter', ListCopy);   
                    this.handleOnSubmit(this.state.Lista, ListCopy); 
                    }
             }
            removeItem = (index)=> {
                    console.log('removeItem start app()', this.state)
                    var lista = this.state.Lista;
                    var index = index;
                    var peace = lista.splice(index, 1);
                    
                    //console.log peace, lista and index
                    console.log('peace', peace, 'lista', lista, 'index', index )
                    this.setState({Lista: lista})
                    window.localStorage.removeItem(`${peace}`);
                    console.log('removeItem end', this.state)
                  }

            handleOnSubmit(list, copy){
              console.log('handleStateEdit() start');
              if(copy.length > list.length) {
                    console.log('A list was added named:');
                    //create a new list with initial values
                    var addition = copy[(copy.length -1)];
                    console.log(addition);
                    var pendiente = prompt('EL PINCHE PENDIENTE?');
                    while(pendiente == undefined || pendiente == ''){
                      var pendiente = prompt('Apurate guey');
                    }
                    items = JSON.parse(window.localStorage.getItem('items'));
                    console.log('items',items)
                    window.localStorage.setItem(`${items}`, updated);  //it looks like saving a list name is working, need to be able to save the list
              }
              console.log('handleStateEdit() end');
            } 
            render(){
             //window.localStorage.clear();
               console.log("localStorage", "App render()", window.localStorage);
                //display state of the app
                console.log('App state', 'render()',this.state);
            

                    return(
                   
                             <div className="App">
                                <h1>Pendientes para aprender</h1>
                               
                                <form onSubmit={this.onSubmit}>
                                    <input  
                                        type = 'text'                                  
                                        value={this.state.titulotxt}                                        placeholder="Listas"
                                        onChange={this.onChange} 
                                       onSubmit={this.onSubmit} 
                                    />
                                </form>
                                <div className="LosPendientesContainer" >

                                         {this.state.Lista.map((d, i) => (<LosPendientes removeItem={this.removeItem}  name={d} index={i} key={'k[-'+ i} />)) }
                                </div>
                               </div>
                    );

            }
  }

    ReactDOM.render(
        <App />, rootEl
    );




// This checks for local changes and automatically refreshes the browser (hot-reloading)
if (module.hot) {
    module.hot.accept('./components/App.jsx', () => renderApp());
}