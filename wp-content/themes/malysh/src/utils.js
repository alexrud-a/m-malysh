export function contains(where, what, param) {
    if (!what) {
        return true;
    }
    for (var i = 0; i < what.length; i++) {
        for (var j = 0; j < where.length; j++) {
            if (what[i] == where[j][param]) {
                break;
            }
            if (j === where.length - 1) {
                return false;
            }
        }
    }
    return true;
}

export function containsAttributes(where, what) {
    if (!what) {
        return true;
    }
    for (var i = 0; i < what.length; i++) {
        for (var j = 0; j < where.length; j++) {
            if (what[i] == where[j]) {
                break;
            }
            if (j === where.length - 1) {
                return false;
            }
        }
    }
    return true;
}