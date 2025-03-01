<?php get_header(); ?>

<main class="site-main">
    <div class="container">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article <?php post_class(); ?>>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <div class="entry-content">
                    <?php the_excerpt(); ?>
                </div>
            </article>
        <?php endwhile; else : ?>
            <p><?php esc_html_e('Nema postova za prikaz.', 'trapavisanjar'); ?></p>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
