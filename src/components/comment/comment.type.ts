interface IUser {
    _id: string;
    name: string;
    profileImage: string;
}

interface IReply {
    userId: IUser;
    message: string;
    createdAt: String;
}

export interface ICommentData {
    _id: string;
    userId: IUser;
    postId: string;
    message: string;
    replies: IReply[];
    likeCount: number;
    createdAt: String;
}

export interface ICreateComment {
    targetId: string;
    message: string;
}
