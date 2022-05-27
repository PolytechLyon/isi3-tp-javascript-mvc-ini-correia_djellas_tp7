class Observable{

    constructor() {
        this.observer = [];
    }


    AddObserver(observer){
        this.observer.add(observer);
    }

    RemoveObserver(observer){
        this.observer.remove(observer);
    }

    NotifyObserver(){
        this.observer.forEach((Observer) => Update(this));

    }

    SetState(_state){
        this.state = _state
        this.NotifyObserver();
    }

    GetState(){
        return this.state;
    }
}