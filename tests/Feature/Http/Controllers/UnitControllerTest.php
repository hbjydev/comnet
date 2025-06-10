<?php

test('example', function () {
    $response = $this->get('/units');

    $response->assertStatus(200);
});
