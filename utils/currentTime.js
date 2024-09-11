function currentTimeJakarta() {
    const now = new Date();
    const gmtPlus7OffsetMs = 7 * 60 * 60 * 1000;
    const gmtPlus7Time = new Date(now.getTime() + gmtPlus7OffsetMs);
    return gmtPlus7Time;
}

module.exports = currentTimeJakarta;