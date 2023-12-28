

export class UpdateTodoDto{
    private constructor(
        public readonly id:number,
        public readonly text?:string,
        public readonly createdAt?:Date,
    ){

    }
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.text) returnObj.text = this.text;
        if (this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { text, createdAt,id } = props;
        let newCreated = createdAt;
        if(!id || isNaN(Number(id))){
            return ['id must be a valid number']
        }
        if(createdAt){
            newCreated = new Date(createdAt);
            if(newCreated.toString()==='Indalid Date'){
                return ['CreatedAt must be a valid date'];
            }
        }

        return [undefined, new UpdateTodoDto(id,text, newCreated)];
    }
}