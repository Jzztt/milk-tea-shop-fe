 const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        currency: 'VND'
    }).format(amount);
}
export default formatVND;

