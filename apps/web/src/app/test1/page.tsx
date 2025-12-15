'use client';

import { useState } from 'react';
import { authApi, roomsApi } from '@/lib/api';

/**
 * EXEMPLE SANS gestionnaire d'erreur
 *
 * Regarde comme tu dois répéter le code de gestion d'erreur partout
 */
export default function ExampleWithoutHandler() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ====== LOGIN - Tu dois gérer TOUTES les erreurs manuellement ======
  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await authApi.login({
        email: 'user@example.com',
        password: 'wrong-password',
      });
      setUser(result.user as any);
    } catch (error: any) {
      // Tu dois répéter ce code dans CHAQUE fonction! 😫
      if (error.response?.status === 401) {
        console.log('❌ Identifiants incorrects');
        alert('Identifiants incorrects'); // Notification manuelle
      } else if (error.response?.status === 500) {
        console.log('❌ Erreur serveur');
        alert('Erreur serveur');
      } else if (!error.response) {
        console.log('❌ Pas de connexion internet');
        alert('Vérifiez votre connexion internet');
      } else {
        console.log('❌ Erreur inconnue:', error.message);
        alert('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  // ====== CREATE ROOM - Encore la même gestion d'erreur! ======
  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      await roomsApi.createRoom({
        name: 'Test Room',
        description: 'Room de test',
      });
    } catch (error: any) {
      // 😫 On doit répéter le même code!
      if (error.response?.status === 401) {
        console.log('❌ Non authentifié - Redirection...');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        console.log('❌ Permissions insuffisantes');
        alert('Vous n\'avez pas les permissions');
      } else if (error.response?.status === 500) {
        console.log('❌ Erreur serveur');
        alert('Erreur serveur');
      } else {
        console.log('❌ Erreur:', error.message);
        alert('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  // ====== GET ROOM - Toujours la même chose... ======
  const handleGetRoom = async () => {
    setLoading(true);
    try {
      await roomsApi.getRoom('fake-id');
    } catch (error: any) {
      // 😫😫😫 Code dupliqué partout!
      if (error.response?.status === 404) {
        console.log('❌ Room non trouvée');
        alert('Cette room n\'existe pas');
      } else if (error.response?.status === 401) {
        console.log('❌ Non authentifié');
        window.location.href = '/login';
      } else if (error.response?.status === 500) {
        console.log('❌ Erreur serveur');
        alert('Erreur serveur');
      } else {
        console.log('❌ Erreur:', error.message);
        alert('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>❌ Exemple SANS gestionnaire d'erreur</h1>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        Regarde comme le code est répétitif!
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleLogin} disabled={loading} style={{ padding: '10px' }}>
          Login (40 lignes de code avec gestion d'erreur)
        </button>
        <button onClick={handleCreateRoom} disabled={loading} style={{ padding: '10px' }}>
          Create Room (40 lignes de code avec gestion d'erreur)
        </button>
        <button onClick={handleGetRoom} disabled={loading} style={{ padding: '10px' }}>
          Get Room (40 lignes de code avec gestion d'erreur)
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#ffe0e0', borderRadius: '5px' }}>
        <h3>Problèmes sans gestionnaire d'erreur:</h3>
        <ul>
          <li>❌ Code dupliqué partout (DRY violation)</li>
          <li>❌ Difficile à maintenir (changement = modifier partout)</li>
          <li>❌ Risque d'oublier de gérer certaines erreurs</li>
          <li>❌ Pas de gestion centralisée des redirections</li>
          <li>❌ Beaucoup plus de lignes de code</li>
        </ul>
      </div>
    </div>
  );
}
