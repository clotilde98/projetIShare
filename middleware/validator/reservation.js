import vine from '@vinejs/vine';

export const createReservationSchema = vine.object({
    post_id: vine.number().positive(),
    client_id: vine.number().positive(), 
    reservation_status: vine.enum(['confirmed', 'cancelled']).optional(), 
}); 

export const updateReservationSchema = vine.object({
    reservation_status: vine.enum(['confirmed', 'cancelled']).optional(),
    post_id: vine.number().positive().optional(),
    client_id: vine.number().positive().optional(),
});

export const
    createReservationValidator = vine.compile(createReservationSchema),
    updateReservationValidator = vine.compile(updateReservationSchema);