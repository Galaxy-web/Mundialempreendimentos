<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Função para filtrar propriedades com base no tipo selecionado
        function filtrarPropriedades() {
            const tipoSelecionado = document.getElementById('filter-type').value;
            const propriedades = document.querySelectorAll('.property-section');

            propriedades.forEach(function (section) {
                const propriedadesTipo = section.querySelectorAll('.property');

                propriedadesTipo.forEach(function (propriedade) {
                    const propriedadeTipo = propriedade.getAttribute('data-tipo');

                    if (tipoSelecionado === 'todos' || tipoSelecionado === propriedadeTipo) {
                        propriedade.style.display = 'block';
                    } else {
                        propriedade.style.display = 'none';
                    }
                });
            });
        }

        // Adicionar evento de mudança ao menu suspenso para acionar o filtro
        document.getElementById('filter-type').addEventListener('change', filtrarPropriedades);

        // Chamar a função inicialmente para garantir que as propriedades estejam corretamente exibidas ao carregar a página
        filtrarPropriedades();
    });
</script>
