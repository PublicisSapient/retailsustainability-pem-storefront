export default function capitalizeFirstLetter(str : String) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}