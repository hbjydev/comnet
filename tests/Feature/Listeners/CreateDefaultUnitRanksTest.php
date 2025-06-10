<?php

use App\Models\Unit;

test('listener creates default resources', function () {
    $unit = Unit::create([
        'display_name' => 'Test Unit',
        'slug' => 'test_unit',
    ]);

    expect(sizeof($unit->ranks) > 0)->toBe(true);
});
