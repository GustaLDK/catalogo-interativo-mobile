import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { buscarProdutos } from '../services/api';
import { logout } from '../store/authSlice';

type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};

type Props = {
  titulo: string;
  categorias: string[];
};

export default function ProductList({
  titulo,
  categorias,
}: Props) {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro('');

      const dados = await buscarProdutos(categorias);

      setProdutos(dados);
    } catch {
      setErro('Não foi possível carregar os produtos.');
    } finally {
      setCarregando(false);
    }
  }

  function sair() {
    dispatch(logout());
    router.replace('/login');
  }

  function abrirProduto(id: number) {
    router.push({
      pathname: '/produto/[id]',
      params: {
        id: String(id),
      },
    });
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />

        <Text style={styles.mensagem}>
          Carregando produtos...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.mensagem}>{erro}</Text>

        <Pressable
          style={styles.botao}
          onPress={carregarProdutos}
        >
          <Text style={styles.textoBotao}>
            Tentar novamente
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>{titulo}</Text>

        <Pressable onPress={sair}>
          <Text style={styles.logout}>Sair</Text>
        </Pressable>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => abrirProduto(item.id)}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.imagem}
            />

            <View style={styles.info}>
              <Text style={styles.nome}>
                {item.title}
              </Text>

              <Text style={styles.preco}>
                US$ {item.price.toFixed(2)}
              </Text>

              <Text style={styles.desconto}>
                {item.discountPercentage}% de desconto
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#ffffff',
  },

  mensagem: {
    fontSize: 16,
    color: '#374151',
  },

  topo: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111827',
  },

  logout: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: 'bold',
  },

  lista: {
    padding: 15,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    flexDirection: 'row',
  },

  imagem: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },

  preco: {
    fontSize: 17,
    color: '#2563eb',
    fontWeight: 'bold',
  },

  desconto: {
    marginTop: 5,
    color: '#16a34a',
    fontWeight: '500',
  },

  botao: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});