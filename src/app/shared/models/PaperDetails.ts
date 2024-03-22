export interface PaperDetails {
    id: string;
    document_id: string;
    title: string;
    subject_id: string;
    grade: string;
    language: string[];
    language_class: string;
    published_month: string;
    published_year: string;
    paper_no: string;
    source: string;
    created_at: string;
    updated_at: string;
    is_favorite?: boolean; // This is not part of the API response, but we will add it in the client
}