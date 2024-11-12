interface IGenericErrorResponse {
  status: number;
  message: string;
  success: boolean;
}

interface IBorrowPayload {
  bookId: string;
  memberId: string;
}

interface IOverdueResponse {
  borrowId: string
  bookTitle: string
  borrowerName: string
  overdueDays: number
}
