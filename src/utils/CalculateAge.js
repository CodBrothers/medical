export function calculateAge(dateString) {
    if (!dateString) return undefined;

    const birthDate = new Date(dateString);
    if (isNaN(birthDate.getTime())) return undefined; // Invalid date

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 0 ? age : 0;
}
