export interface IAnswerDetail {
    id: number,
    answer_test : string,
    serialAnswer : number,
    test_id : number,
    serial_answer: number,
    created_by: string,
    updated_by: string,
    created_at: string,
    updated_at: string
  }
  
  export interface ICreateAnswer {
    answer_test : string,
    serialAnswer : number,
    test_id : number,
    serial_answer: number,
  }
  
  export interface IUpdateAnswer {
    answer_test : string,
    serialAnswer : number,
    test_id : number,
    serial_answer: number,
  }

  