export const buildUpdateQuery = (table, fields, idField = "id") => {
    if (!fields || Object.keys(fields).length === 0) {
        throw new Error("No fields provided for update");
    }

    const updates = [];
    const values = [];

    for (let key in fields) {
        updates.push(`${key} = ?`);
        values.push(fields[key]);
    }

    const sql = `UPDATE ${table} SET ${updates.join(", ")} WHERE ${idField} = ?`;
    return { sql, values };
};

// export const buildUpdateQuery = (table, fields, idField = "id", allowedFields = []) => {
//     if (!fields || Object.keys(fields).length === 0) {
//         throw new Error("No fields provided for update");
//     }

//     const updates = [];
//     const values = [];

//     for (let key in fields) {
//         const value = fields[key];

//         // Agar allowedFields diya hai to usi ke fields update ho
//         if (allowedFields.length > 0 && !allowedFields.includes(key)) {
//             continue;
//         }

//         // Skip agar value undefined/null hai
//         if (value === undefined || value === null) {
//             continue;
//         }

//         updates.push(`${key} = ?`);
//         values.push(value);
//     }

//     // Auto update timestamp (agar table me column ho to chalega)
//     updates.push(`updated_at = NOW()`);

//     if (updates.length === 0) {
//         throw new Error("No valid fields to update");
//     }

//     const sql = `UPDATE ${table} SET ${updates.join(", ")} WHERE ${idField} = ?`;
//     return { sql, values };
// };
