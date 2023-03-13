export const handleVerication = async (event) => {
    const { name, value } = event.target;
    try {
        await validationSchema.validateAt(name, formData);
        setErrors({ ...errors, [name]: "" });
    } catch (error) {
        setErrors({ ...errors, [name]: error.message });
    }
};