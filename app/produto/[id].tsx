import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { buscarProdutoPorId } from '../../src/services/api';

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};

export default function ProdutoDetalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarProduto();
  }, [id]);

  async function carregarProduto() {
    if (!id) return;

    try {
      setCarregando(true);
      setErro('');

      const dados = await buscarProdutoPorId(id);
      setProduto(dados);
    } catch {
      setErro('Não foi possível carregar o produto.');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  if (erro || !produto) {
    return (
      <View style={styles.centro}>
        <Text>{erro || 'Produto não encontrado.'}</Text>

        <Pressable style={styles.botao} onPress={() => router.back()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </Pressable>

      <Image
        source={{ uri: produto.thumbnail }}
        style={styles.imagem}
      />

      <Text style={styles.titulo}>{produto.title}</Text>

      <Text style={styles.descricao}>
        {produto.description}
      </Text>

      <Text style={styles.preco}>
        US$ {produto.price.toFixed(2)}
      </Text>

      <Text style={styles.desconto}>
        {produto.discountPercentage}% de desconto
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#ffffff',
  },

  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },

  voltar: {
    fontSize: 17,
    color: '#2563eb',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  imagem: {
    width: '100%',
    height: 330,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
  },

  descricao: {
    fontSize: 17,
    color: '#4b5563',
    lineHeight: 25,
    marginBottom: 20,
  },

  preco: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  desconto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 8,
  },

  botao: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});