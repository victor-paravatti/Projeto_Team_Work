import React, { useState, useEffect } from 'react';
import '../css/Cadastro.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from '../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../graphql/mutations';
import Navabar from '../layout/NavBar';
import Footer from '../layout/Footer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from "@material-ui/icons/Add";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Fab } from "@material-ui/core";
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const initialFormState = { name: '', description: '' }

function Cadastro() {
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(notesFromAPI.map(async note => {
            if (note.image) {
                const image = await Storage.get(note.image);
                note.image = image;
            }
            return note;
        }))
        setNotes(apiData.data.listNotes.items);
    }

    async function createNote() {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createNoteMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setNotes([...notes, formData]);
        setFormData(initialFormState);
    }

    async function deleteNote({ id }) {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteNoteMutation, variables: { input: { id } } });
    }

    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchNotes();
    }

    return (
        <><Navabar /><>
            <div className="row">
                <div className="col l4">
                    <div className="">

                        <Box boxShadow={4} width="auto">
                            <div className="esp">
                                <Typography variant="h4" component="h4">
                                    Estagiarios
                                </Typography>
                            </div>
                            <div className="esp1">
                                <TextField
                                    id="filled-basic"
                                    label="Nome"
                                    variant="filled"
                                    onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                    placeholder="Nome"
                                    value={formData.name} />

                                <TextField
                                    id="filled-basic"
                                    label="Função"
                                    variant="filled"
                                    onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                                    placeholder="Função"
                                    value={formData.description} />

                                <input accept="image/*" id="icon-button-file" type="file" onChange={onChange}/>
                                <label htmlFor="icon-button-file">
                                    <IconButton className="teal lighten-2" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>

                                <Fab className="esp2"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    onClick={createNote}
                                >
                                    <AddIcon />
                                </Fab>

                            </div>

                            <List>
                                <Grid item xs={12} md={12}>
                                    {notes.map(note => (
                                        <div key={note.id || note.name}>
                                            <ListItem alignItems="flex-start">

                                                <ListItemAvatar>
                                                    {note.image &&
                                                        <Avatar src={note.image} alt="" />}
                                                </ListItemAvatar>

                                                <ListItemText className="esp1"
                                                    primary={note.name}
                                                    secondary={<React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            {note.description}
                                                        </Typography>

                                                    </React.Fragment>} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(note)} variant="contained" color="secondary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    ))}

                                </Grid>
                            </List>
                            <button class="btn-large waves-effect waves-light" type="submit" name="action">Terminar Criação de Grupo
                                <i class="material-icons right">send</i>
                            </button>


                        </Box>

                    </div>

                </div>

                <div className="col l4">
                    <div className="">

                        <Box boxShadow={4} width="auto">
                            <div className="esp">
                                <Typography variant="h4" component="h4">
                                    Colaboradores
                                </Typography>
                            </div>
                            <div className="esp1">
                                <TextField
                                    id="filled-basic"
                                    label="Nome"
                                    variant="filled"
                                    onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                    placeholder="Nome"
                                    value={formData.name} />

                                <TextField
                                    id="filled-basic"
                                    label="Função"
                                    variant="filled"
                                    onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                                    placeholder="Função"
                                    value={formData.description} />

                                <input accept="image/*" id="icon-button-file" type="file" onChange={onChange}/>
                                <label htmlFor="icon-button-file">
                                    <IconButton className="teal lighten-2" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>

                                <Fab
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    onClick={createNote}
                                >
                                    <AddIcon />
                                </Fab>



                            </div>

                            <List>
                                <Grid item xs={12} md={12}>
                                    {notes.map(note => (
                                        <div key={note.id || note.name}>
                                            <ListItem className="teal lighten-2" alignItems="flex-start">

                                                <ListItemAvatar>
                                                    {note.image &&
                                                        <Avatar src={note.image} alt="" />}
                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={note.name}
                                                    secondary={<React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            {note.description}
                                                        </Typography>

                                                    </React.Fragment>} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(note)} variant="contained" color="secondary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    ))}

                                </Grid>
                            </List>
                            <button class="btn-large waves-effect waves-light" type="submit" name="action">Terminar Criação de Grupo
                                <i class="material-icons right">send</i>
                            </button>

                        </Box>

                    </div>

                </div>
                <div className="col l4">
                    <div className="">

                        <Box boxShadow={4} width="auto">
                            <div className="esp">
                                <Typography variant="h4" component="h4">
                                    Estudantes
                                </Typography>
                            </div>
                            <div className="esp1">
                                <TextField
                                    id="filled-basic"
                                    label="Nome"
                                    variant="filled"
                                    onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                    placeholder="Nome"
                                    value={formData.name} />

                                <TextField
                                    id="filled-basic"
                                    label="Função"
                                    variant="filled"
                                    onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                                    placeholder="Função"
                                    value={formData.description} />
                                <input accept="image/*" id="icon-button-file" type="file" onChange={onChange}/>
                                <label htmlFor="icon-button-file">
                                    <IconButton className="teal lighten-2" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>

                                <Fab
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    color="teal lighten-2"
                                    onClick={createNote}
                                >
                                    <AddIcon />
                                </Fab>

                            </div>

                            <List>
                                <Grid item xs={12} md={12}>
                                    {notes.map(note => (
                                        <div key={note.id || note.name}>
                                            <ListItem className="teal lighten-2" alignItems="flex-start">

                                                <ListItemAvatar>
                                                    {note.image &&
                                                        <Avatar src={note.image} alt="" />}
                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={note.name}
                                                    secondary={<React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            {note.description}
                                                        </Typography>

                                                    </React.Fragment>} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(note)} variant="contained" color="secondary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    ))}

                                </Grid>
                            </List>
                            <button class="btn-large waves-effect waves-light" type="submit" name="action">Terminar Criação de Grupo
                                <i class="material-icons right">send</i>
                            </button>


                        </Box>

                    </div>

                </div>

            </div>
            <Footer />

        </></>
    );
}

export default Cadastro;

