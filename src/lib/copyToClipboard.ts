export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
            return Promise.resolve();
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            return Promise.reject(err);
        });
}
