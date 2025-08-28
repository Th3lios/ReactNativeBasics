import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// Tab 1: Posts Feed
const PostsTab = () => {
  const [posts] = useState([
    { id: 1, title: 'React Native Tips', author: 'Juan Pérez', likes: 42, content: 'Consejos útiles para React Native development...' },
    { id: 2, title: 'JavaScript ES2024', author: 'María García', likes: 38, content: 'Las nuevas características de JavaScript...' },
    { id: 3, title: 'Mobile Performance', author: 'Carlos López', likes: 55, content: 'Optimizando el rendimiento en aplicaciones móviles...' },
    { id: 4, title: 'UI/UX Design', author: 'Ana Rodríguez', likes: 67, content: 'Principios de diseño para mobile apps...' },
    { id: 5, title: 'TypeScript Advanced', author: 'Pedro Martín', likes: 29, content: 'Características avanzadas de TypeScript...' },
  ]);

  return (
    <ScrollView style={styles.tabContainer}>
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postAuthor}>Por {post.author}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
          <View style={styles.postStats}>
            <Text style={styles.likes}>❤️ {post.likes} likes</Text>
            <Pressable style={styles.likeButton}>
              <Text style={styles.likeButtonText}>Me gusta</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

// Tab 2: Search
const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      // Simular búsqueda
      const results = [
        { id: 1, type: 'user', name: 'Juan Pérez', subtitle: '@juandev' },
        { id: 2, type: 'post', name: 'React Native Tutorial', subtitle: 'Desarrollo móvil' },
        { id: 3, type: 'tag', name: '#ReactNative', subtitle: '1.2k posts' },
        { id: 4, type: 'user', name: 'María García', subtitle: '@mariadesign' },
      ].filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'post': return '📝';
      case 'tag': return '#️⃣';
      default: return '🔍';
    }
  };

  return (
    <View style={styles.tabContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios, posts, tags..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
      </View>
      
      <ScrollView style={styles.resultsContainer}>
        {searchQuery.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateTitle}>Busca contenido</Text>
            <Text style={styles.emptyStateSubtitle}>
              Encuentra usuarios, posts y tags escribiendo arriba
            </Text>
          </View>
        )}
        
        {searchQuery.length > 0 && searchResults.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>😔</Text>
            <Text style={styles.emptyStateTitle}>Sin resultados</Text>
            <Text style={styles.emptyStateSubtitle}>
              No encontramos nada para "{searchQuery}"
            </Text>
          </View>
        )}
        
        {searchResults.map((result) => (
          <Pressable key={result.id} style={styles.resultItem}>
            <Text style={styles.resultIcon}>{getResultIcon(result.type)}</Text>
            <View style={styles.resultContent}>
              <Text style={styles.resultName}>{result.name}</Text>
              <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
            </View>
            <Text style={styles.resultArrow}>→</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

// Tab 3: Profile
const ProfileTab = () => {
  const [user] = useState({
    name: 'Juan Pérez',
    username: '@juandev',
    bio: 'React Native Developer | JavaScript enthusiast | Open source contributor',
    followers: 1248,
    following: 892,
    posts: 156,
  });

  const [stats] = useState([
    { label: 'Posts', value: user.posts, color: '#007AFF' },
    { label: 'Seguidores', value: user.followers, color: '#34C759' },
    { label: 'Siguiendo', value: user.following, color: '#FF9500' },
  ]);

  return (
    <ScrollView style={styles.tabContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👨‍💻</Text>
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileUsername}>{user.username}</Text>
        <Text style={styles.profileBio}>{user.bio}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statItem, { borderLeftColor: stat.color }]}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.actionsContainer}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Editar Perfil</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.secondaryButton]}>
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Compartir</Text>
        </Pressable>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        {[
          'Publicó "React Native Tips"',
          'Le gustó un post de María García',
          'Siguió a Carlos López',
          'Comentó en "JavaScript ES2024"',
        ].map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityIcon}>•</Text>
            <Text style={styles.activityText}>{activity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Tab scenes map
const renderScene = SceneMap({
  posts: PostsTab,
  search: SearchTab,
  profile: ProfileTab,
});

// Custom Tab Bar
const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={styles.tabIndicator}
    style={styles.tabBar}
    labelStyle={styles.tabLabel}
    activeColor="#007AFF"
    inactiveColor="#8E8E93"
    renderLabel={({ route, focused, color }) => (
      <Text style={[styles.tabLabel, { color }]}>
        {route.title}
      </Text>
    )}
  />
);

// Main Top Tabs Component using TabView
const TopTabsNavigator = () => {
  const layout = useWindowDimensions();
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'search', title: 'Buscar' },
    { key: 'profile', title: 'Perfil' },
  ]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Material Top Tabs</Text>
        <Text style={styles.subtitle}>
          Navegación horizontal con swipe gestures
        </Text>
      </View>
      
      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={styles.tabView}
      />
      
      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 Características Implementadas</Text>
        <Text style={styles.infoText}>
          ✅ Swipe horizontal entre tabs{'\n'}
          ✅ Indicador animado personalizado{'\n'}
          ✅ Contenido interactivo en cada tab{'\n'}
          ✅ Search con resultados dinámicos{'\n'}
          ✅ Profile con estadísticas{'\n'}
          ✅ Posts feed con likes
        </Text>
      </View>
    </View>
  );
};

// Main Example Screen - Using TabView directly instead of Material Top Tabs
const TopTabsExample = () => {
  return <TopTabsNavigator />;
};

const styles = StyleSheet.create({
  // Header Styles
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  
  // Tab View Styles
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'none',
  },
  tabIndicator: {
    backgroundColor: '#007AFF',
    height: 3,
  },
  
  // Tab Content Styles
  tabContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Posts Tab Styles
  postCard: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  postContent: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 16,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: {
    fontSize: 14,
    color: '#666',
  },
  likeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  likeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Search Tab Styles
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  resultArrow: {
    fontSize: 18,
    color: '#007AFF',
  },
  
  // Profile Tab Styles
  profileHeader: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 32,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 12,
  },
  activityText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  
  // Info Section
  infoSection: {
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#1976d2',
    lineHeight: 16,
  },
});

export default TopTabsExample;