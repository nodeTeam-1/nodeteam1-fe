interface IUser {
    _id: string;
    name: string;
    profileImage: string;
}

interface IReply {
    userId: IUser;
    message: string;
}

export interface ICommentData {
    _id: string;
    userId: IUser;
    postId: string;
    content: string;
    replies: IReply[];
    likeCount: number;
}

export interface ICreateComment {
    targetId: string;
    content: string;
}
