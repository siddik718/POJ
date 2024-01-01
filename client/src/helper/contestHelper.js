
export const haveProblem = (problemNO) => {
    if(sessionStorage.getItem(`problem : ${problemNO}`))return true;
    return false;
}

export const StoreProblem = (problemNO,verdict) => {
    sessionStorage.setItem(`problem : ${problemNO}`,JSON.stringify(verdict));
}

export const getVerdict = (problemNO) => {
    return JSON.parse(sessionStorage.getItem(`problem : ${problemNO}`));
}
export const deleteContestData = () => {
    const keysToRemove = [];

    // Iterate through all keys in sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);

        // Check if the key starts with "problem"
        if (key && key.startsWith('problem')) {
            keysToRemove.push(key);
        }
    }

    // Remove all keys related to problems
    keysToRemove.forEach(key => {
        sessionStorage.removeItem(key);
    });
}
