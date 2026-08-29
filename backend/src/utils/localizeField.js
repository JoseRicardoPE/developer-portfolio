export function localizeField(field, language='es') {
    if (!field) {
        return false;
    }
    return field[language] ?? field.es;
}