import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UseStateExample = () => {
  // Ejemplos básicos de useState
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [color, setColor] = useState('#007AFF');

  // Ejemplo con objeto
  const [user, setUser] = useState({
    name: 'Juan',
    age: 25,
    email: 'juan@email.com'
  });

  // Ejemplo con array
  const [items, setItems] = useState(['React', 'Native']);
  const [newItem, setNewItem] = useState('');

  // Función para actualizar objeto
  const updateUser = (field: string, value: string | number) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  // Función para agregar item
  const addItem = () => {
    if (newItem.trim()) {
      setItems(prevItems => [...prevItems, newItem.trim()]);
      setNewItem('');
    }
  };

  // Función para remover item
  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const colors = ['#007AFF', '#4caf50', '#f44336', '#ff9800', '#9c27b0'];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>useState Hook</Text>
          <Text style={styles.description}>
            useState te permite agregar estado local a componentes funcionales. 
            Retorna un array con el valor actual y una función para actualizarlo.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintaxis Básica</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const [state, setState] = useState(initialValue);
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 1: Contador Simple</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.counterDisplay}>Contador: {count}</Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, styles.decrementButton]}
                onPress={() => setCount(count - 1)}>
                <Text style={styles.buttonText}>- 1</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.resetButton]}
                onPress={() => setCount(0)}>
                <Text style={styles.buttonText}>Reset</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.incrementButton]}
                onPress={() => setCount(count + 1)}>
                <Text style={styles.buttonText}>+ 1</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const [count, setCount] = useState(0);{'\n'}
              setCount(count + 1); // Incrementar{'\n'}
              setCount(prevCount => prevCount + 1); // Función updater
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 2: Input de Texto</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Escribe tu nombre"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.greeting}>
              {name ? `¡Hola, ${name}!` : 'Escribe tu nombre arriba'}
            </Text>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const [name, setName] = useState('');{'\n'}
              {'<TextInput value={name} onChangeText={setName} />'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 3: Estado Booleano</Text>
          <View style={styles.exampleContainer}>
            <Pressable
              style={styles.toggleButton}
              onPress={() => setIsVisible(!isVisible)}>
              <Text style={styles.toggleButtonText}>
                {isVisible ? 'Ocultar' : 'Mostrar'} Mensaje
              </Text>
            </Pressable>
            {isVisible && (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                  🎉 ¡Este mensaje es controlado por useState!
                </Text>
              </View>
            )}
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const [isVisible, setIsVisible] = useState(true);{'\n'}
              setIsVisible(!isVisible); // Toggle
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 4: Estado con Objeto</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.userCard}>
              <Text style={styles.userInfo}>Nombre: {user.name}</Text>
              <Text style={styles.userInfo}>Edad: {user.age}</Text>
              <Text style={styles.userInfo}>Email: {user.email}</Text>
            </View>
            <View style={styles.buttonRow}>
              <Pressable
                style={styles.updateButton}
                onPress={() => updateUser('age', user.age + 1)}>
                <Text style={styles.buttonText}>+1 Año</Text>
              </Pressable>
              <Pressable
                style={styles.updateButton}
                onPress={() => updateUser('name', 'Pedro')}>
                <Text style={styles.buttonText}>Cambiar Nombre</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const [user, setUser] = useState({'{'}name: 'Juan', age: 25{'}'});{'\n'}
              setUser(prevUser => ({'{'}{'\n'}
              {'  '}...prevUser,{'\n'}
              {'  '}age: prevUser.age + 1{'\n'}
              {'})'});
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 5: Estado con Array</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.itemInput}
                placeholder="Nuevo item"
                value={newItem}
                onChangeText={setNewItem}
              />
              <Pressable style={styles.addButton} onPress={addItem}>
                <Text style={styles.addButtonText}>Agregar</Text>
              </Pressable>
            </View>
            <View style={styles.itemsList}>
              {items.map((item, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemText}>{item}</Text>
                  <Pressable
                    style={styles.removeButton}
                    onPress={() => removeItem(index)}>
                    <Text style={styles.removeButtonText}>✕</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const [items, setItems] = useState(['React']);{'\n'}
              setItems(prevItems => [...prevItems, newItem]); // Agregar{'\n'}
              setItems(prevItems => prevItems.filter((_, i) => i !== index)); // Remover
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 6: Selector de Color</Text>
          <View style={styles.exampleContainer}>
            <View style={[styles.colorDisplay, { backgroundColor: color }]}>
              <Text style={styles.colorText}>Color Actual</Text>
            </View>
            <View style={styles.colorPalette}>
              {colors.map((c, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: c },
                    color === c && styles.selectedColor
                  ]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Usa función updater cuando el nuevo estado dependa del anterior{'\n'}
            ✅ Para objetos y arrays, siempre crea una nueva referencia{'\n'}
            ✅ Agrupa estados relacionados en un solo objeto{'\n'}
            ✅ Inicializa con el tipo correcto de dato{'\n\n'}
            ⚠️ No mutes el estado directamente{'\n'}
            ⚠️ No uses useState para valores que no afectan el render
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
  exampleContainer: {
    marginVertical: 8,
  },
  counterDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: '#4caf50',
  },
  decrementButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#9e9e9e',
  },
  updateButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    margin: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  toggleButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messageContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  messageText: {
    fontSize: 16,
    color: '#1976d2',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  userInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  itemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  itemsList: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#f44336',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  colorDisplay: {
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#333',
    borderWidth: 3,
  },
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default UseStateExample;
