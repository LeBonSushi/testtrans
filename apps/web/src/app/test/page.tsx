'use client';

import { useEffect, useState } from 'react';
import { apiClient, authApi, roomsApi } from '@/lib/api';

/**
 * EXEMPLE CONCRET : Utilisation du gestionnaire d'erreur
 *
 * Ce composant montre comment configurer le gestionnaire d'erreur
 * pour afficher des notifications à l'utilisateur
 */
export default function ExampleWithNotifications() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // ====== EXEMPLE 1: Login (route publique) ======
  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await authApi.login({
        email: 'user@example.com',
        password: 'wrong-password', // Mot de passe incorrect pour tester l'erreur
      });
      console.log('✅ Connecté:', result.user);
      setUser(result.user as any);
    } catch (error) {
      // L'erreur est déjà gérée par l'intercepteur
      // Pas besoin de code supplémentaire ici!
      console.log('Le gestionnaire d\'erreur a déjà géré cette erreur');
    } finally {
      setLoading(false);
    }
  };

  // ====== EXEMPLE 2: Récupérer les rooms (route protégée) ======
  const handleGetRooms = async () => {
    setLoading(true);
    try {
      const userRooms = await roomsApi.createRoom({
        name: 'Test Room',
        description: 'Room de test',
      });
      console.log('✅ Room créée:', userRooms);
      // Si l'utilisateur n'est pas authentifié, le gestionnaire redirigera vers /login
    } catch (error) {
      // Erreur déjà gérée
      console.log('Le gestionnaire d\'erreur a déjà géré cette erreur');
    } finally {
      setLoading(false);
    }
  };

  // ====== EXEMPLE 3: Accéder à une ressource inexistante ======
  const handleGetNonExistentRoom = async () => {
    setLoading(true);
    try {
      await roomsApi.getRoom('fake-room-id-that-does-not-exist');
    } catch (error) {
      // Le gestionnaire affichera "Ressource non trouvée"
      console.log('Le gestionnaire d\'erreur a déjà géré cette erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Exemple d'utilisation du gestionnaire d'erreur</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>État actuel:</h2>
        <p>Utilisateur: {user ? JSON.stringify(user) : 'Non connecté'}</p>
        <p>Chargement: {loading ? 'Oui' : 'Non'}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          Tester Login (avec mauvais mot de passe)
        </button>

        <button
          onClick={handleGetRooms}
          disabled={loading}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          Créer une Room (nécessite authentification)
        </button>

        <button
          onClick={handleGetNonExistentRoom}
          disabled={loading}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          Récupérer une Room inexistante (404)
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Ouvre la console pour voir les messages !</h3>
        <p>Les erreurs seront affichées avec des emojis:</p>
        <ul>
          <li>❌ Erreur</li>
          <li>⚠️ Attention</li>
          <li>ℹ️ Info</li>
        </ul>
      </div>
    </div>
  );
}
