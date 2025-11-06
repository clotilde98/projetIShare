import vine from '@vinejs/vine';


const addComment = vine.object({
    content:vine.string(), 
    idPost:vine.int(), 
    id_costumer:vine.int()
})







CREATE TABLE Comment (
    id SERIAL PRIMARY KEY,
    content VARCHAR(300),
    date DATE DEFAULT CURRENT_DATE,
    id_post INT NOT NULL,
    id_costumer INT NOT NULL,
    CONSTRAINT fk_post FOREIGN KEY (id_post) REFERENCES Post(id),
    CONSTRAINT fk_costumer FOREIGN KEY (id_costumer) REFERENCES Client(id)


);