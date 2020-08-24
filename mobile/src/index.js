import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';


export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then((response) => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `New Project ${Date.now()}`,
            owner: "Amauri Oliveira"
        });
        const project = response.data;

        setProjects([...projects, project]);

    }

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#7159C1"
            />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text
                            style={styles.project}
                        >
                            {project.title}
                        </Text>
                    )}
                />

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
            {/*   <View>
                {projects.map((project) => (
                    <Text
                        style={styles.project}
                        key={project.id}
                    >
                        {project.title}
                    </Text>
                ))}
            </View> */}
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7159C1',
        flex: 1,
        /*    justifyContent: 'center',
           alignItems: 'center', */
    },
    project: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 12,
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});