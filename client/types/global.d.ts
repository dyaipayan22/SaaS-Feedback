interface Feedback {
  _id: string;
  title: string;
  category: string;
  description: string;
  upvotes: number;
  status: string;
  comments?: [
    {
      content: string;
      user: object;
      replyingTo: string;
      replies: [
        {
          content: string;
          username: string;
        }
      ];
    }
  ];
}
