interface IGenericErrorResponse {
  status: number;
  message: string;
  success: boolean;
}

interface IBorrowPayload {
  bookId: string;
  memberId: string;
}
