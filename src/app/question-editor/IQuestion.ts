export interface IQuestion {
    id: string;
    paper_id: string;
    question_no: string;
    question_type: string;
    label: string;
    content: string;
    marks: number;
    answer: string;
    ai_generated?: string;
    loading?: boolean; // this is not part of the model, but is used to show a loading spinner
};