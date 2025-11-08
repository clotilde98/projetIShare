import vine from '@vinejs/vine';

export const createReservationSchema = vine.object({
    postID: vine.number().positive(),
    reservation_status: vine.enum(['confirmed', 'cancelled']),
}); 

export const updateReservationSchema = vine.object({
    reservation_status: vine.enum(['confirmed', 'cancelled']).optional(),
    postID: vine.number().positive().optional(),
    clientID: vine.number().positive().optional(),
});

export const
    createReservationValidator = vine.compile(createReservationSchema),
    updateReservationValidator = vine.compile(updateReservationSchema);