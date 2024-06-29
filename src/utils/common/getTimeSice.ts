// 특정 날짜로부터 경과 시간을 계산하는 함수
export const getTimeSince = (date: Date) => {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
        return `${Math.floor(secondsPast)}초 전`;
    }
    if (secondsPast < 3600) {
        return `${Math.floor(secondsPast / 60)}분 전`;
    }
    if (secondsPast < 86400) {
        return `${Math.floor(secondsPast / 3600)}시간 전`;
    }
    if (secondsPast < 604800) {
        return `${Math.floor(secondsPast / 86400)}일 전`;
    }
    if (secondsPast < 2592000) {
        return `${Math.floor(secondsPast / 604800)}주 전`;
    }
    if (secondsPast < 31104000) {
        return `${Math.floor(secondsPast / 2592000)}개월 전`;
    }
    return `${Math.floor(secondsPast / 31104000)}년 전`;
};
