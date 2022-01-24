<script>
    import {currentStation, currentStationPS} from "../scripts/appState"
    let plot_mean_container, plot_max_container, plot_min_container
    let initialized=false
    $: {
        console.log("$currentStation", $currentStation)
        if (plot_mean_container && plot_max_container && $currentStation && $currentStationPS) {
            console.log("$currentStationPlots", $currentStationPS)
            if (!initialized) {
                initialized = true
                plot_mean_container.append($currentStationPS.meanMonthlyPS.plot)
                plot_max_container.append($currentStationPS.maxMonthlyPS.plot)
                plot_min_container.append($currentStationPS.minMonthlyPS.plot)
            } 
        }
    }

</script>

<div class="container">
    {#if $currentStation}
        <div class="header">
            {$currentStation.info.label}
        </div>
        <div class="plot" bind:this={plot_mean_container}>

        </div>
        <div class="plot" bind:this={plot_max_container}>
        
        </div>
        <div class="plot" bind:this={plot_min_container}>
        
        </div>
    {:else}
        <div class="no-data">
            <p>Click on a hydrometric station on the map</p>
        </div>
    {/if}
    <!-- <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure alias distinctio, doloribus ullam voluptatibus quia. Distinctio totam officia alias odit, dolorem sapiente iste fuga! Eos, explicabo quas est aperiam quod debitis earum animi quidem cupiditate possimus ex inventore facilis iusto unde expedita ab temporibus, neque dignissimos autem fuga non doloribus illo! Voluptate fugit illo aut expedita, quia odit iusto praesentium quisquam temporibus? Culpa pariatur optio molestiae eligendi? Ea illum qui dignissimos labore voluptas aperiam et ducimus nostrum sunt facilis quidem libero architecto voluptatum maxime dolore asperiores non perspiciatis suscipit doloribus earum, sed incidunt? Aperiam repudiandae numquam dicta nemo ipsum, nostrum sint cum adipisci et, inventore quo facere sit iure non tempora dolorum, animi fuga magni laborum libero exercitationem culpa quos veritatis cumque? Accusantium molestiae mollitia eaque inventore ipsam, et reiciendis odit aliquam? Quidem labore unde non qui, culpa natus eligendi ea fuga deleniti nam vero, sit sunt ratione soluta sed repudiandae est nisi iste! Impedit mollitia maxime laborum eveniet et possimus iusto fugiat, nobis esse perferendis molestiae illum sint aperiam, ipsa hic nostrum aliquam autem dolore. Aliquid, ex expedita vero, officiis ad velit consequuntur dolorum repudiandae quo veniam delectus. Doloremque ex autem beatae nobis, pariatur exercitationem earum asperiores quaerat culpa cum veritatis tenetur atque libero quam nemo vel omnis itaque reiciendis sint, molestias dolores eaque saepe nulla! Nam hic beatae blanditiis sed minus, nemo consequatur ea laboriosam est distinctio commodi sint dolor praesentium accusamus accusantium obcaecati aperiam quo libero ut officiis cupiditate, fugiat corrupti. Eum odit sequi, quidem quam pariatur at consequuntur vel adipisci unde. Pariatur, consequuntur dolor perspiciatis voluptatem provident rem illum. Vitae ea beatae, aliquid at explicabo doloremque. Deserunt animi sequi reiciendis, provident officia, laboriosam eius explicabo facilis, repudiandae optio eum hic ad minus ducimus omnis! Nostrum accusantium praesentium dolor necessitatibus? Debitis ipsa officiis ea qui optio fugit, laboriosam repudiandae minus delectus illum aliquam possimus excepturi consequuntur nisi rerum autem blanditiis culpa quasi! Sapiente soluta reiciendis laborum nemo non possimus doloremque, cupiditate dignissimos repellat nihil ipsum saepe aut quasi explicabo harum sint veniam! Qui inventore commodi, nemo aut ex id! Odit cum, saepe at deleniti corrupti ab, nostrum mollitia, praesentium tempore repellat sunt officiis! Animi optio cupiditate voluptatum officiis, beatae quod quibusdam? Fugit, necessitatibus, ab odio est cumque aut, atque natus nisi ea ad asperiores quam. Illo magni iure ab unde aut voluptatum facere, quaerat similique tempore vel numquam odit doloremque! Architecto optio numquam soluta esse neque suscipit possimus, ipsa asperiores pariatur commodi consectetur amet vero sunt recusandae quibusdam dolorem distinctio accusantium fugiat? Ab odit eum, animi sed doloribus hic quisquam incidunt fugiat cum autem, mollitia illo possimus error, rerum quaerat molestias! Voluptas omnis culpa tenetur saepe fuga vel distinctio veniam ut. Nostrum sequi itaque natus quia ratione sapiente possimus odio, cum excepturi alias laborum voluptate repudiandae consequuntur aliquid quam voluptatibus nulla quidem perferendis harum, placeat, doloribus eos aspernatur cupiditate voluptatum? Inventore itaque sint veritatis earum facere repellat id nemo quaerat adipisci magni laborum aperiam, et aut accusamus iste. Praesentium veniam, culpa deleniti architecto autem exercitationem omnis eveniet unde maiores maxime ipsa ipsum laudantium natus quidem sit? Nostrum, aliquid! Quos, exercitationem voluptatum esse dolores temporibus cupiditate voluptatibus quod impedit nisi, asperiores quidem adipisci. Earum velit repudiandae quidem saepe explicabo dolorum accusamus adipisci quisquam tempora incidunt natus sunt in, voluptatibus harum est labore consectetur laboriosam corrupti asperiores consequatur placeat debitis perspiciatis deserunt repellendus. Cupiditate minus laboriosam voluptates natus dolorem dicta modi eveniet quaerat tempore aspernatur odio unde nihil id corporis amet, nam et assumenda esse rerum cumque velit vel animi consequatur? Consectetur porro officiis quia suscipit, commodi excepturi cumque voluptates. Hic sunt minima amet temporibus eligendi cumque magnam dicta saepe vel cupiditate. Placeat voluptatem dolore qui. Nisi, nemo. Quia eveniet dignissimos molestias nostrum debitis reiciendis esse incidunt accusantium! Saepe at officiis ea mollitia aut repudiandae laudantium, deserunt a nesciunt nobis veniam aperiam voluptatibus harum vero. Doloremque deleniti asperiores nam impedit ab fugit aliquam nisi, et quidem est porro voluptatibus quos illum vel at voluptates dolore libero animi debitis odit delectus. Adipisci itaque asperiores molestiae laudantium laboriosam saepe eligendi non culpa quo aliquid nulla, magnam illum at eius velit ipsam enim numquam exercitationem consequatur a, earum autem? Distinctio cumque iste rem autem cupiditate sunt? Qui consequuntur veritatis tenetur eligendi quibusdam cum! Dolore dolor perspiciatis delectus quis officiis illo sint nostrum nihil error optio unde neque in impedit eveniet ratione culpa corrupti, quos magnam nobis laboriosam iste id. Necessitatibus excepturi nostrum fugit ex id tempora soluta possimus rerum libero, reiciendis impedit? Dicta necessitatibus cupiditate natus, nam neque labore corporis dolor rerum dolorem tempore, libero consequuntur velit facilis sint ullam impedit? Necessitatibus distinctio quas atque. Totam adipisci nihil sapiente nobis dolore necessitatibus odit. Quibusdam quaerat sed, non natus quam error corrupti provident, omnis vel unde odit quia voluptas fuga quisquam numquam delectus pariatur mollitia repudiandae ex, soluta molestiae. Alias mollitia labore voluptates a incidunt. Laborum corrupti, ipsum itaque saepe animi labore repellendus tempora cupiditate quos id pariatur eum deleniti praesentium et facere sed exercitationem earum molestiae commodi. Iure labore distinctio sit cupiditate praesentium earum minima veniam quam sunt cumque incidunt quod quas quos officiis eaque dicta aliquid, tenetur quia ipsam, facilis corporis! Quibusdam nisi iusto perferendis? Ullam dolorum aliquam, placeat, deserunt veniam eligendi recusandae provident quaerat tempora corporis ipsum quam, tempore modi corrupti commodi quibusdam! Perferendis dolores recusandae odio praesentium alias vitae quae nesciunt deserunt? Quia tempore asperiores veniam temporibus iste ab dolore laudantium incidunt reprehenderit repellendus, distinctio nesciunt exercitationem vel, repellat explicabo modi suscipit soluta natus accusantium! Quis reiciendis unde corrupti assumenda, quam ad officia voluptatem consequuntur nobis ipsa, eveniet dignissimos, quas ducimus. Omnis velit odit aliquam voluptate vero quibusdam quisquam. Illum culpa pariatur doloribus, assumenda quam aliquid rem facilis fugit iure molestias dolor quo non fugiat nemo voluptate provident aliquam exercitationem vel eos reprehenderit explicabo. Repudiandae beatae dolores vitae velit minus cumque. Doloribus error similique suscipit voluptas facere nobis, sed assumenda? Optio ullam, consequatur dolor at tempore distinctio reprehenderit molestiae quis voluptatem consequuntur nemo illo voluptatum consectetur vel sint! Nostrum, ab ad deserunt dolor nobis repudiandae corrupti numquam ipsum eum.
    </div> -->
</div>


<style>
    .container {
        position: absolute;
        z-index: 9997;
        top: 60px;
        bottom: 0;
        max-height: calc(100vh - 60px); 
        overflow-y: auto;
        width: min(50%, 600px);
        background-color: var(--color-background);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
        /* box-shadow: 5px -5px 20px 0 rgba(0, 0, 0, 0.5); */
    }
    @media screen and (max-width: 1200px) {
        .container {
            width: 100%;
            bottom: unset;
        }
    }

    .header {
        text-align: center;
        padding: 0.5rem;
    }
    .plot {
        margin-right: 1rem;
    }
    .no-data {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
    }
    .no-data > p {
        text-align: center;
    }
</style>